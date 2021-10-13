<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("api/user/{id}", name="show_user")
     */
    public function showUser(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $user = $userRepository->getUser($id);

        $response->setContent(json_encode($user));
        return $response;
    }

    /**
     * @Route("/userFromEmail/{email}", name="show_user")
     */
    public function userFromEmail(UserRepository $userRepository, String $email):Response
    {
        $response = new Response();
        $userId = $userRepository->findOneBy(['email' => $email])->getId();
        $user = $userRepository->getUser($userId);

        $response->setContent(json_encode($user));
        return $response;
    }



    /**
     * @Route("/api/user/{id}", name="show_current_user")
     */
    public function showCurrentUser(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $user = $userRepository->getUser($id);
        $response->setContent(json_encode($user));
        return $response;
    }

    /**
     * @Route("/users", name="show_all_users")
     */
    public function showAllUsers(UserRepository $userRepository): Response
    {
        $response = new Response();
        $users = $userRepository->getAllUsers();
        $response->setContent(json_encode($users));
        return $response;
    }

    /**
     * @Route("/showSearchedUsers/{nameSurname}", name="show_searched_users")
     */
    public function showSearchedUsers(UserRepository $userRepository, String $nameSurname): Response
    {
        $splitNameSurname = explode(" ", $nameSurname);
        if(isset($splitNameSurname[1])){
            $name=$splitNameSurname[0];
            $surname=$splitNameSurname[1];
        }else{
            $name=$nameSurname;
            $surname=$nameSurname;
        }

        $response = new Response();
        $users =$userRepository->getSearchedUsers($name, $surname);
        $response->setContent(json_encode($users));
        return $response;
    }

    /**
     * @Route("/api/userActivities/{id}", name="show__current_user_activities")
     */
    public function showCurrentUserActivities(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $activities = $userRepository->getAllUserActivities($id);
        $response->setContent(json_encode($activities));
        return $response;
    }

    /**
     * @Route("/userActivities/{id}", name="show_user_activities")
     */
    public function showUserActivities(UserRepository $userRepository, int $id):Response
    {
        $response = new Response();
        $activities = $userRepository->getAllUserActivities($id);
        $response->setContent(json_encode($activities));
        return $response;
    }

    /**
     * @Route("/api/changeUserPassword/{id}", name="change_user_password")
     */
    public function changeUserPassword(Request $request, UserRepository $userRepository, int $id, UserPasswordEncoderInterface $encoder):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user =$userRepository->find($id);
        $email = $user->getEmail();

        $currentPassword = $params['body']['currentPassword'];
        $password = $params['body']['password'];
        $confirmedPassword = $params['body']['confirmedPassword'];

        if(!$encoder->isPasswordValid($user, $currentPassword)){
            throw $this->createNotFoundException('Niepoprawne hasło!');
        }

        if($password != $confirmedPassword){
            throw $this->createNotFoundException('Hasła się różnią!');
        };

        $userRepository->changeUserPassword($email ,$password, $encoder);

        $response = new Response();
        $response->setContent(json_encode('Password has changed'));
        return $response;
    }
}
