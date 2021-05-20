<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/user/{id}", name="show_user")
     */
    public function showUser(int $id):Response
    {
        $response = new Response();
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->getUser($id);

        $response->setContent(json_encode($user));
        return $response;
    }

    /**
     * @Route("/api/user/{id}", name="show_current_user")
     */
    public function showCurrentUser(int $id):Response
    {
        $response = new Response();
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->getUser($id);
        $response->setContent(json_encode($user));
        return $response;
    }

    /**
     * @Route("/users", name="show_all_users")
     */
    public function showAllUsers(): Response
    {
        $response = new Response();
        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllUsers();
        $response->setContent(json_encode($users));
        return $response;
    }

    /**
     * @Route("/showSearchedUsers/{nameSurname}", name="show_searched_users")
     */
    public function showSearchedUsers(String $nameSurname): Response
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
        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->getSearchedUsers($name, $surname);
        $response->setContent(json_encode($users));
        return $response;
    }

    /**
     * @Route("/api/userActivities/{id}", name="show__current_user_activities")
     */
    public function showCurrentUserActivities(int $id):Response
    {
        $response = new Response();
        $activities = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllUserActivities($id);
        $response->setContent(json_encode($activities));
        return $response;
    }

    /**
     * @Route("/userActivities/{id}", name="show_user_activities")
     */
    public function showUserActivities(int $id):Response
    {
        $response = new Response();
        $activities = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllUserActivities($id);
        $response->setContent(json_encode($activities));
        return $response;
    }

    /**
     * @Route("/api/changeUserPassword/{id}", name="change_user_password")
     */
    public function changeUserPassword(Request $request, int $id, UserPasswordEncoderInterface $encoder):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);
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

        $this->getDoctrine()
            ->getRepository(User::class)
            ->changeUserPassword($email ,$password, $encoder);

        return $this->render('index/index.html.twig');
    }
}
