<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Token;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/", name="home_page")
     */
    public function home(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/login", name="login")
     */
    public function login(): Response
    {

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/register", name="registration")
     */
    public function register(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/editProfile", name="edit_profil")
     */
    public function editProfile(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/messages", name="messages")
     */
    public function messages(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/newmessage", name="new_message")
     */
    public function newmessage(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/receivermessage", name="receiver_message")
     */
    public function receivermessage(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/sendmessage", name="send_message")
     */
    public function sendmessage(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/notification", name="notification")
     */
    public function notification(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/yourProfile", name="your_profile")
     */
    public function yourProfile(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/profile/{id}", name="profile")
     */
    public function showProfile(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/singleChat", name="single_chat")
     */
    public function singleChat(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/watched", name="watched")
     */
    public function watched(): Response
    {
        return $this->render('index/index.html.twig');
    }
    /**
     * @Route("/followers", name="followers")
     */
    public function followers(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/search", name="search")
     */
    public function search(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("chat/conversation/{id}", name="get_conversation")
     */
    public function getConversation(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/chat", name="conversation_page")
     */
    public function conversations(UserRepository $userRepository): Response
    {
        $user = $userRepository->find(1);
        $username = $user->getUsername();
        $config = Configuration::forSymmetricSigner(new Sha256(), InMemory::plainText('mercure_secret_key'));
        $token = $config->builder()
            ->withClaim('mercure', ['subscribe' => [sprintf("/%s", $username)]])
            ->getToken($config->signer(), $config->signingKey())
        ;

        $response = $this->render('index/index.html.twig');
        $response->headers->setCookie(
            new Cookie(
                'mercureAuthorization',
                $token->toString(),
                (new \DateTime())
                ->add(new \DateInterval('PT2H')),
                './well-known/mercure',
                null,
                false,
                true,
                false,
                'strict'
            )
        );
        return $response;
    }
}
