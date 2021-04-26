<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Logs;
use App\Entity\Role;
use App\Entity\User;
use App\Entity\UserDetails;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/createUser", name="add_user")
     */
    public function createUser(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $address = $this->getDoctrine()
            ->getRepository(Address::class);

        $userDetails = $this->getDoctrine()
            ->getRepository(UserDetails::class);

        $user = $this->getDoctrine()
            ->getRepository(User::class);

        $id_role = ['id' => 2];
        $role = $this->getDoctrine()
            ->getRepository(Role::class)
            ->findOneBy($id_role);

        $newAddress = $address->addAddress($params['street'], $params['postalCode'], $params['city']);
        $newUserDetails = $userDetails->addUserDatails($params['name'], $params['surname'], 'https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg', $newAddress);
        $user->addUser($params['email'], $params['password'], $newUserDetails, $role);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/loginUser", name="login_user")
     */
    public function loginUser(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $email = ['email' => $params['email']];

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        $userDetails = $user->getIdUserDetails();

        if(!$user){
            return $this->render('index/index.html.twig',['messages' =>['User not exist!']]);
        }

        if($user->getEmail() != $params['email']){
            return $this->render('index/index.html.twig',['messages' =>['User with this email not exist!']]);
        };

        if($user->getPassword() != $params['password']){
            return $this->render('index/index.html.twig',['messages' =>['Wrong password!']]);
        };

        $name = $userDetails->getName();
        $surname = $userDetails->getSurname();
        $cookie_name = 'user';
        $cookie_value = $params['email'];
        setcookie($cookie_name, $cookie_value, time() + 3600 * 24 * 30, '/');

        if(!$is_logged=$user->getIsLogged()) {
            $this->getDoctrine()
                ->getRepository(User::class)
                ->loginUser($cookie_value, true);

            $this->getDoctrine()
                ->getRepository(Logs::class)
                ->addLogs($name, $surname);
        }
        return $this->redirectToRoute('home_page');
    }

    /**
     * @Route("/logoutUser", name="logout_user")
     */
    public function logoutUser():Response
    {
        if(isset($_COOKIE['user'])){
            $this->getDoctrine()
                ->getRepository(User::class)
                ->loginUser($_COOKIE['user'], false);
            setcookie('user', "", time() - 3600, '/');
        }
        return $this->render('index/index.html.twig');
    }

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
     * @Route("/showCurrentUser", name="show_current_user")
     */
    public function showCurrentUser():Response
    {
        $response = new Response();
        $email = ['email' => $_COOKIE['user']];
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        $id=$user->getId();
        dump($id);
        $userDetails = $this->getDoctrine()
            ->getRepository(User::class)
            ->getUser($id);

        $response->setContent(json_encode($userDetails));
        return $response;
    }

    /**
     * @Route("/showUsers", name="show_all_users")
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
     * @Route("/userActivities/{id}", name="show_user_activities")
     */
    public function showUserActivities(int $id):Response
    {
        $response = new Response();
        $activities = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllUserActivities($id);
        dump($activities);
        $response->setContent(json_encode($activities));
        return $response;
    }

    /**
     * @Route("/showUserActivities/currentUser", name="show_current_user_activities")
     */
    public function showCurrentUserActivities():Response
    {
        $response = new Response();
        $email = ['email' => $_COOKIE['user']];
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        $id=$user->getId();
        $activities = $this->getDoctrine()
            ->getRepository(User::class)
            ->getAllUserActivities($id);
        dump($activities);
        $response->setContent(json_encode($activities));
        return $response;
    }

    public function generateToken(){
        return bin2hex(random_bytes(50));
    }
}
