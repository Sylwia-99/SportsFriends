<?php

namespace App\Controller;

use App\Entity\Activities;
use App\Entity\Activity;
use App\Entity\Address;
use App\Entity\User;
use App\Entity\UserDetails;
use App\Entity\UsersActivities;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActivityController extends AbstractController
{
    /**
     * @Route("/addActivity", name="add_activity")
     */
    public function addUserActivity(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $entityManager = $this->getDoctrine()->getManager();

        $email = ['email' => $params['email']];
        $name = ['name' => $params['name']];
        $userActivity= new UsersActivities();
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);
        $activity = $this->getDoctrine()
            ->getRepository(Activities::class)
            ->findOneBy($name);
        $userActivity->addIdUser($user->getId());
        $userActivity->addIdActivity($activity);
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($userActivity);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/addUsersActivity", name="add_user_activity")
     */
    public function addUsersActivity():Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $email = ['email' => 'dawid@interia.pl'];
        $name = ['name' => 'Bieganie'];
        $userActivity= new UsersActivities();
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);
        $activity = $this->getDoctrine()
            ->getRepository(Activities::class)
            ->findOneBy($name);
        $userActivity->addIdUser($user->getId());
        $userActivity->addIdActivity($activity);
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($userActivity);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return $this->render('index/index.html.twig');
    }
}
