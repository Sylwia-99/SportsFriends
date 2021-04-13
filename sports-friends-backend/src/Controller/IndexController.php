<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    private $users = [
        [
            'id' => 2,
            'name' => 'Kamil',
            'surname' => 'Kowalski',
            'avatar' => 'https://randomuser.me/api/portraits/men/42.jpg',
            'activity' => 'Pływanie'
        ],
        [
            'id' => 3,
            'name' => 'Agnieszka',
            'surname' => 'Sroka',
            'avatar' => 'https://randomuser.me/api/portraits/women/67.jpg',
            'activity' => 'Bieganie'
        ],
        [
            'id' => 5,
            'name' => 'Dawid',
            'surname' => 'Mosur',
            'avatar' => 'https://randomuser.me/api/portraits/men/89.jpg',
            'activity' => 'Jazda na rowerze'
        ]
    ];

    /**
     * @Route("/{ReactRouting}", name="index", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/", name="homePage")
     */
    public function home(): Response
    {
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/users", name="users")
     * @return JsonResponse
     */
    public function getUsers()
    {
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $users = $this->users;
        $response->setContent(json_encode($users));

        return $response;
    }
}
