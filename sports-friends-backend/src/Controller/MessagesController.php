<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessagesController extends AbstractController
{
    /**
     * @Route("/createMessage", name="add_message")
     */
    public function createMessage(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);

        dump($params);
        $message = $this->getDoctrine()
        ->getRepository(Messages::class);

        $idUserSender = ['id' => $params['idUserSender']];
        $idUserRecipient = ['id' => $params['idUserRecipient']];

        $userSender = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($idUserSender);

        $userRecipient = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($idUserRecipient);

        $message->addMessage($userSender, $userRecipient, $params['contents']);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/getUserReceivedMessages", name="get_received_messages")
     */
    public function getUserReceivedMessages():Response
    {
        $response = new Response();

        $messages = $this->getDoctrine()
            ->getRepository(Messages::class)
            ->getReceivedMessages();

        $response->setContent(json_encode($messages));
        return $response;
    }

    /**
     * @Route("/getUserSentMessages", name="get_sent_messages")
     */
    public function getUserSentMessages():Response
    {
        $response = new Response();

        $messages = $this->getDoctrine()
            ->getRepository(Messages::class)
            ->getSentMessages();

        $response->setContent(json_encode($messages));
        return $response;
    }
}
