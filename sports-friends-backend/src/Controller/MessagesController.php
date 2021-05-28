<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\User;
use App\Repository\MessagesRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessagesController extends AbstractController
{
    /**
     * @Route("/api/createMessage", name="add_message")
     */
    public function createMessage(Request $request, UserRepository $userRepository, MessagesRepository $messagesRepository):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);

        $idUserSender = ['id' => $params['body']['idUserSender']];
        $idUserRecipient = ['id' => $params['body']['idUserRecipient']];

        $userSender = $userRepository->findOneBy($idUserSender);
        $userRecipient = $userRepository->findOneBy($idUserRecipient);

        $messagesRepository->addMessage($userSender, $userRecipient, $params['body']['contents']);

        $response = new Response();
        $response->setContent(json_encode('Message has sent'));
        return $response;
    }

    /**
     * @Route("/api/getUserReceivedMessages/{id}", name="get_received_messages")
     */
    public function getUserReceivedMessages(int $id, MessagesRepository $messagesRepository):Response
    {
        $response = new Response();
        $messages = $messagesRepository->getReceivedMessages($id);
        $response->setContent(json_encode($messages));
        return $response;
    }

    /**
     * @Route("/api/getUserSentMessages/{id}", name="get_sent_messages")
     */
    public function getUserSentMessages(int $id, MessagesRepository $messagesRepository):Response
    {
        $response = new Response();
        $messages = $messagesRepository->getSentMessages($id);
        $response->setContent(json_encode($messages));
        return $response;
    }
}
