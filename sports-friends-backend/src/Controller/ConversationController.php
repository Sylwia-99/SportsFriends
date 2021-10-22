<?php

namespace App\Controller;

use Fig\Link\Link;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use App\Repository\ConversationRepository;
use App\Entity\Conversation;
use App\Entity\Participant;
use Doctrine\ORM\EntityManagerInterface;

class ConversationController extends AbstractController
{
    /**
     * @Route("/api/newConversation/{id}", name="newConversation")
     */
    public function index(Request $request, int $id, UserRepository $userRepository, ConversationRepository $conversationRepository, EntityManagerInterface $entityManagerInterface): Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $otherUser = $params['body']['otherUser'];

        $otherUser = $userRepository->find($otherUser);
        $me = $userRepository->find($id);

        if(is_null($otherUser)){
            throw new \Exception('The user was not found');
        }

        if($otherUser->getId() === $id){
           throw new \Exception("You can't create a conversation with yourself");
        }

        $conversation = $conversationRepository->findConversationsByUsers(
            $otherUser->getId(),
            $me->getId()
        );

        if($conversation != null){
            return $this->json([
                'id' => $conversation['conversationId']
            ], Response::HTTP_CREATED, [], []);
        }

        $conversation = new Conversation();

        $participant = new Participant();
        $participant->setUser($me);
        $participant->setConversation($conversation);

        $otherParticipant = new Participant();
        $otherParticipant->setUser($otherUser);
        $otherParticipant->setConversation($conversation);

        $entityManagerInterface->getConnection()->beginTransaction();
        try{
            $entityManagerInterface->persist($conversation);
            $entityManagerInterface->persist($participant);
            $entityManagerInterface->persist($otherParticipant);

            $entityManagerInterface->flush();
            $entityManagerInterface->commit();
        } catch(\Exception $e){
            $this->entityManager->rollback();
            throw $e;
        }

        return $this->json([
        'id' => $conversation->getId()
        ], Response::HTTP_CREATED, [], []);
    }

    /**
     * @Route("api/getConversations/{id}", name="getConversations")
     */
    public function getConversations(Request $request, int $id, UserRepository $userRepository, ConversationRepository $conversationRepository, EntityManagerInterface $entityManagerInterface): Response
    {
        $user = $userRepository->find($id)->getId();
        $conversations = $conversationRepository->findConversationsByUser($user);

        $hubUrl = $this->getParameter('mercure.default_hub');
        $this->addLink($request, new Link('mercure', $hubUrl));

        dump($hubUrl);
        return $this->json($conversations);
    }
}
