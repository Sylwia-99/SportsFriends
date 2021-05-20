<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Logs;
use App\Entity\User;
use App\Entity\UserDetails;
use Firebase\JWT\JWT;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/createUser", name="add_user")
     */
    public function createUser(Request $request, UserPasswordEncoderInterface $encoder):Response
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
        $address = $this->getDoctrine()
            ->getRepository(Address::class);

        $userDetails = $this->getDoctrine()
            ->getRepository(UserDetails::class);

        $user = $this->getDoctrine()
            ->getRepository(User::class);

        $userEmail = ['email' => $params['body']['email']];

        $userExist = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($userEmail);

        if($userExist){
            throw $this->createNotFoundException('Użytkownik o taki emailu już istnieje!');
        }

        if($password != $confirmPassword){
            throw $this->createNotFoundException('Hasła się różnią!');
        };
        $newAddress = $address->addAddress($street, $postalCode, $city);
        $newUserDetails = $userDetails->addUserDatails($name, $surname, 'https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg', $newAddress);
        $user->addUser($email, $password, $newUserDetails, $encoder);
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/loginUser", name="login_user")
     */
    public function loginUser(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $email = ['email' => $params['body']['email']];

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

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
        $cookie_name = 'user';
        $cookie_value = $params['body']['email'];
        setcookie($cookie_name, $cookie_value, time() + 3600 * 24 * 30, '/');

        if(!$is_logged=$user->getIsLogged()) {
            $this->getDoctrine()
                ->getRepository(User::class)
                ->loginUser($cookie_value, true);

            $this->getDoctrine()
                ->getRepository(Logs::class)
                ->addLogs($name, $surname);
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
    public function logoutUser():Response
    {
        if(isset($_COOKIE['user'])){
            $this->getDoctrine()
                ->getRepository(User::class)
                ->loginUser($_COOKIE['user'], false);
            setcookie('user', "", time() - 3600, '/');

            /*$email = ['email' => $_COOKIE['user']];
            $user=$this->getDoctrine()
                ->getRepository(User::class)
                ->findOneBy($email);

            $payload = [
                'user' => $user->getUsername(),
                'exp' => (new \DateTime())->modify('+5 days')->getTimestamp(),
            ];
            $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
            return $this->json([
                'message' => 'logout success! ',
                'token' => sprintf('Bearer %s', $jwt),

            ]);*/
        }
        return $this->render('index/index.html.twig');
    }

}
