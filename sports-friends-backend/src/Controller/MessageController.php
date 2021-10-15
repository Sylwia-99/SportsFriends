<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Participant;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MessageController extends AbstractController
{
    const ATTRIBUTES_TO_SERIALIZE = ['id', 'user_id', 'content', 'createdAt', 'mine'];

    /**
     * @Route("/messages/{id}/{myId}", name="getMessages")
     */
    public function index(Request $request, int $id, int $myId, ConversationRepository $conversationRepository, UserRepository $userRepository,MessageRepository $messageRepository): Response
    {
        $conversation = $conversationRepository->findOneBy(['id' => $id]);
        //$this->denyAccessUnlessGranted('view', $conversation);
        $messages = $messageRepository->findMessageByConversationId($conversation->getId());

        $me = $userRepository->findOneBy(['id' => $myId]);
        /**
         * @var $message Message
         */
        array_map(function ($message) use ($me) {
            $message->setMine(
                $message->getUser()->getId() === $me->getId()
                    ? true : false
            );
        }, $messages);

        return $this->json($messages, Response::HTTP_OK, [], [

         'attributes' => self::ATTRIBUTES_TO_SERIALIZE]);
    }

    /**
     * @Route("api/newMessage/{id}", name="newMessage", methods={"POST"})
     */
    public function newMessage(Request $request, int $id, ConversationRepository $conversationRepository, UserRepository $userRepository, ParticipantRepository $participantRepository, EntityManagerInterface $entityManager, SerializerInterface $serializer, HubInterface $hub): Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $myId = $params['body']['myId'];

        $user = $userRepository->findOneBy(['id' => $myId]);
        $conversation = $conversationRepository->findOneBy(['id' => $id]);
        $recipient = $participantRepository->findParticipantByConversationIdAndUserId(
            $conversation->getId(),
            $user->getId()
        );

        $content = $params['body']['content'];
        $message = new Message();
        $message->setContent($content);
        $message->setUser($user);

        $conversation->addMessage($message);
        $conversation->setLastMessage($message);

        $entityManager->getConnection()->beginTransaction();
        try {
            $entityManager->persist($message);
            $entityManager->persist($conversation);
            $entityManager->flush();
            $entityManager->commit();
        } catch (\Exception $e) {
            $entityManager->rollback();
            throw $e;
        }

        $message->setMine(false);
        $messageSerialized = $serializer->serialize(
            $message, 'json', [
            'attributes' => ['id', 'user_id', 'content', 'createdAt', 'mine', 'conversation' => ['id']]
        ]);
        $update = new Update(
            [
                sprintf('/getConversations/%s', $conversation->getId()),
                sprintf('/getConversations/%s', $recipient->getUser()->getEmail()),
            ],
            $messageSerialized
            ,true, $recipient->getUser()->getEmail()
            /*[

                sprintf("/%s", $recipient->getUser()->getUsername())
            ]*/
        );

        dump($update);

        $hub->publish($update);
        $message->setMine(true);

        return $this->json($message, Response::HTTP_CREATED, [], [
            'attributes' => self::ATTRIBUTES_TO_SERIALIZE
        ]);
    }
}
