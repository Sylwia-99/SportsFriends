<?php

namespace App\Controller;

use App\Entity\Activities;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserDetailsRepository;
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
     * @Route("deleteUser/{id}", name="delete_user")
     */
    public function deleteUser(UserRepository $userRepository, int $id, ParticipantRepository $participantRepository, MessageRepository $messageRepository, ConversationRepository  $conversationRepository, UserDetailsRepository $userDetailsRepository):Response
    {
        $response = new Response();
        $user = $userRepository->find($id);
        $userId= $user->getId();
        $userRepository->removeWatchedUserByAdmin($userId);
        $userRepository->removeUserFromFollowersByAdmin($userId);

        $participantRepository->removeParticipantByUserId($userId);
        //$conversations = $conversationRepository->findConversationsByUser($userId);
        $conversations = $messageRepository->findConversationsByUserId($userId);
        foreach($conversations as $conversation)
        {
            $conversationId = $conversation['conversation_id'];
            $participantRepository->removeParticipantByConversationId($conversationId);
            $conversationRepository->setLastMessageIdOnNull($conversationId);
            $messageRepository->removeMessageByByConversationId($conversationId);
            $conversationRepository->removeConversationById($conversationId);

        }

        //$messageRepository->removeMessageByUserId($userId);

        $userDetailsId = $user->getIdUserDetails()->getId();
        $userRepository->removeAllUserActivities($user);
        $userRepository->removeUserByAdmin($userId);
        $userDetailsRepository->removeUserDatails($userDetailsId);

        $response->setContent(json_encode('Usunięto Użytkownika'));
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
        $newUsers = [];
        foreach($users as $user)
        {
            $userId = $user['id'];
            $activities = $userRepository->getAllUserActivities($userId);
            $user['activities'] = $activities;
            array_push($newUsers, $user);
        }

        $response->setContent(json_encode($newUsers));
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
        $newUsers = [];
        foreach($users as $user)
        {
            $userId = $user['id'];
            $activities = $userRepository->getAllUserActivities($userId);
            $user['activities'] = $activities;
            array_push($newUsers, $user);
        }

        $response->setContent(json_encode($newUsers));
        return $response;
    }

    /**
     * @Route("/showAdvancedSearchedUsers", name="show_advanced_searched_users")
     */
    public function showAdvancedSearchedUsers(Request $request,UserRepository $userRepository): Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $activity = $params['body']['filters']['activity'];
        $name = $params['body']['filters']['name'];
        $surname = $params['body']['filters']['surname'];
        $city = $params['body']['filters']['city'];
        $street = $params['body']['filters']['street'];
        $response = new Response();
        $users =$userRepository->getSearchedUsersByFilters($name, $surname, $city, $street);
        $newUsers = [];
        foreach($users as $user)
        {
            $userId = $user['id'];
            $activities = $userRepository->getAllUserActivities($userId);
            $user['activities'] = $activities;
            array_push($newUsers, $user);
        }
        dump($newUsers);

        //$searchUsers = [];
        dump($activity);

        if($activity != ""){
            $searchUsers = [];
            foreach($newUsers as $newUser){
                $newUser['hasThisActicity'] = false;
                foreach($newUser['activities'] as $userActivity){
                    if($userActivity['name'] == $activity){
                        $newUser['hasThisActicity'] = true;
                    }
                }
                if($newUser['hasThisActicity'] == true){
                    array_push($searchUsers, $newUser);
                }
            }
            $newUsers = $searchUsers;
            dump($searchUsers);

        }


        $response->setContent(json_encode($newUsers));
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
