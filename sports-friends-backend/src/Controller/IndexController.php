<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /*
     @Route("/{ReactRouting}", name="index", defaults={"reactRouting": null})

    public function index(): Response
    {
        return $this->render('index/index.html.twig');
    }*/

    /**
     * @Route("/", name="homePage")
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
     * @Route("/editProfile", name="register")
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
     * @Route("/newmessage", name="newmessage")
     */
    public function newmessage(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/receivermessage", name="receivermessage")
     */
    public function receivermessage(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/sendmessage", name="sendmessage")
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
     * @Route("/yourProfile", name="yourProfile")
     */
    public function yourProfile(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/profile", name="profile")
     */
    public function showProfile(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/singleChat", name="singleChat")
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
}
