<?php


namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class QuestionController
{
    /**
     * @Route("/")
     */
    public function homepage(): Response{
        return new Response(
            'Moja pierwsza storna w Symfony!'
        );
    }

    /**
     * @Route("/login")
     */
    public function login(): Response{
        return new Response(
            'Logowanie!'
        );
    }

    /**
     * @Route("/register")
     */
    public function register(): Response{
        return new Response(
            'Rejestracja!'
        );
    }

    /**
     * @Route("/profiles/{id}")
     */
    public function profiles($id): Response{
        return new Response(sprintf(
            'Profile - "%s"',
            $id
        ));
    }

    /**
     * @Route("/{id}")
     */
    public function show($id): Response{
        return new Response(sprintf(
            'Osoba o id! - "%s"',
            $id
        ));
    }
}