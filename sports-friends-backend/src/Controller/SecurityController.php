<?php

namespace App\Controller;

use App\Message\UserRegistered;
use App\Repository\AddressRepository;
use App\Repository\LogsRepository;
use App\Repository\UserDetailsRepository;
use App\Repository\UserRepository;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/createUser", name="add_user")
     */
    public function createUser(Request $request, AddressRepository $addressRepository, UserDetailsRepository $userDetailsRepository, UserRepository $userRepository, UserPasswordEncoderInterface $encoder, MessageBusInterface $bus):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $street = $params['body']['street'];
        $postalCode = $params['body']['postalCode'];
        $city = $params['body']['city'];
        $name = $params['body']['name'];
        $surname = $params['body']['surname'];
        $email = $params['body']['email'];
        $password = $params['body']['password'];
        $confirmPassword = $params['body']['confirmPassword'];

        $userEmail = ['email' => $params['body']['email']];

        $userExist = $userRepository->findOneBy($userEmail);

        if($userExist){
            throw $this->createNotFoundException('Użytkownik o taki emailu już istnieje!');
        }

        if($password != $confirmPassword){
            throw $this->createNotFoundException('Hasła się różnią!');
        };
        $newAddress = $addressRepository->addAddress($street, $postalCode, $city);
        $newUserDetails = $userDetailsRepository->addUserDatails($name, $surname, 'picture.jpg', $newAddress);
        $userRepository->addUser($email, $password, $newUserDetails, $encoder);

        $user=$userRepository->findOneBy($userEmail);
        $bus->dispatch(new UserRegistered($user));

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/loginUser", name="login_user")
     */
    public function loginUser(Request $request, UserRepository $userRepository, LogsRepository $logsRepository, UserPasswordEncoderInterface $encoder)
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $email = ['email' => $params['body']['email']];

        $user = $userRepository->findOneBy($email);

        if(!$user){
            throw $this->createNotFoundException('Użytkownik nie istnieje!');
        }

        $userDetails = $user->getIdUserDetails();

        if($user->getEmail() != $params['body']['email']){
            throw $this->createNotFoundException('Niepoprawny Email!');
        };

        if(!$encoder->isPasswordValid($user, $params['body']['password'])){
            throw $this->createNotFoundException('Niepoprawne Hasło!');
        };

        $name = $userDetails->getName();
        $surname = $userDetails->getSurname();

        if(!$is_logged=$user->getIsLogged()) {
            $userRepository->loginUser($user->getEmail(), true);

            $logsRepository->addLogs($name, $surname);
        }

        $payload = [
            'user' => $user->getUsername(),
            'exp' => (new \DateTime())->modify('+5 days')->getTimestamp(),
        ];

        $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');

        return $this->json([
            'message' => 'success!',
            'token' => sprintf('Bearer %s', $jwt),
            'user' => $user,
            'roles' => $user->getRoles()
        ]);
    }

    /**
     * @Route("/api/logoutUser", name="logout_user")
     */
    public function logoutUser(UserRepository $userRepository):Response
    {
        $username = $this->getUser()->getUsername();
        dump($username);
        $userRepository->loginUser($username, false);
        dump($userRepository);
        session_destroy();
        $response = new Response();
        $response->setContent(json_encode('Pomyślne wylogowanie'));
        return $response;
    }

}
