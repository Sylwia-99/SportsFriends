<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FollowerWatcherController extends AbstractController
{
    /**
     * @Route("/api/addNewUserToWatched/{id}", name="add_user_to_watched")
     */
    public function addNewUserToWatched(int $id):Response
    {
        $email = ['email' => $_COOKIE['user']];
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        $idWatch = ['id' => $id];
        $newWatch = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($idWatch);

        $this->getDoctrine()
            ->getRepository(User::class)
            ->addWatchedUser($user, $newWatch);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/removeWatchedUser/{id}", name="remove_watched_user")
     */
    public function removeWatchedUser(int $id):Response
    {
        $email = ['email' => $_COOKIE['user']];
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        $id = ['id' => $id];
        $watcher = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($id);

        $this->getDoctrine()
            ->getRepository(User::class)
            ->removeWatchedUser($user, $watcher);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/showWatchedUsers/{id}", name="show_watched_users")
     */
    public function showWatchedUsers(int $id):Response
    {
        $response = new Response();

        $watchers = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllWatchedUsers($id);
        $response->setContent(json_encode($watchers));

        return $response;
    }

    /**
     * @Route("/api/showFollowerUsers/{id}", name="show_follower_users")
     */
    public function showFollowerUsers(int $id):Response
    {
        $response = new Response();

        $followers = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllFollowerUsers($id);
        $response->setContent(json_encode($followers));

        return $response;
    }
}
