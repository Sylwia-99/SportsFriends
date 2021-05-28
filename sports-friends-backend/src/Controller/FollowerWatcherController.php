<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FollowerWatcherController extends AbstractController
{
    /**
     * @Route("/api/addNewUserToWatched/{id}", name="add_user_to_watched")
     */
    public function addNewUserToWatched(UserRepository $userRepository, int $id):Response
    {
        $username = $this->getUser()->getUsername();
        $email = ['email' => $username];
        $user = $userRepository->findOneBy($email);

        $idWatch = ['id' => $id];
        $newWatch = $userRepository->findOneBy($idWatch);

        $userRepository->addWatchedUser($user, $newWatch);

        $response = new Response();
        $response->setContent(json_encode('Dodano użytkownika do obserwowanych'));
        return $response;
    }

    /**
     * @Route("/api/removeWatchedUser/{id}", name="remove_watched_user")
     */
    public function removeWatchedUser(UserRepository $userRepository, int $id):Response
    {
        $username = $this->getUser()->getUsername();
        $email = ['email' => $username];
        $user = $userRepository->findOneBy($email);

        $id = ['id' => $id];
        $watcher = $userRepository->findOneBy($id);

        $userRepository->removeWatchedUser($user, $watcher);

        $response = new Response();
        $response->setContent(json_encode('Usunięto Użytkownika z obserwowanych'));
        return $response;
    }

    /**
     * @Route("/api/showWatchedUsers/{id}", name="show_watched_users")
     */
    public function showWatchedUsers(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $watchers = $userRepository->getAllWatchedUsers($id);
        $response->setContent(json_encode($watchers));

        return $response;
    }

    /**
     * @Route("/api/showFollowerUsers/{id}", name="show_follower_users")
     */
    public function showFollowerUsers(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $followers = $userRepository->getAllFollowerUsers($id);
        $response->setContent(json_encode($followers));

        return $response;
    }
}
