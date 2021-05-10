<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        if(!isset($_COOKIE['user'])){
            return $this->render('index/index.html.twig');
        }
        else{
            return $this->redirectToRoute('home_page');
        }
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
        if(!isset($_COOKIE['user'])){
            return $this->render('index/index.html.twig');
        }
        else{
            return $this->redirectToRoute('home_page');
        }
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
        if(isset($_COOKIE['user'])){
            return $this->render('index/index.html.twig');
        }
        else{
            return $this->redirectToRoute('login');
        }
    }

    /**
     * @Route("/profile/{id}", name="profile")
     */
    public function showProfile(int $id): Response
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
        if(isset($_COOKIE['user'])){
            return $this->render('index/index.html.twig');
        }
        else{
            return $this->redirectToRoute('login');
        }
    }
    /**
     * @Route("/followers", name="followers")
     */
    public function followers(): Response
    {
        if(isset($_COOKIE['user'])){
            return $this->render('index/index.html.twig');
        }
        else{
            return $this->redirectToRoute('login');
        }
    }

    /**
     * @Route("/search", name="search")
     */
    public function search(): Response
    {
        return $this->render('index/index.html.twig');
    }
}
