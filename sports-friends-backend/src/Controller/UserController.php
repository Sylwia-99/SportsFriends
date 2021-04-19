<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use App\Entity\UserDetails;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use http\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/createUser", name="add_user")
     */
    public function createUser(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $entityManager = $this->getDoctrine()->getManager();

        dump($params);
        $userDetails = new UserDetails();
        $userDetails->setName($params['name']);
        $userDetails->setSurname($params['surname']);
        $userDetails->setAvatar('https://i.pinimg.com/originals/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg');
        $address = new Address();
        $address->setStreet($params['street']);
        $address->setPostalCode($params['postalCode']);
        $address->setCity($params['city']);
        $userDetails->setIdAddress($address);
        $user = new User();
        $user->setEmail($params['email']);
        $user->setPassword($params['password']);
        $user->setIdUserDetails($userDetails);
        $user->setIsLogged(false);

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($address);
        $entityManager->persist($userDetails);
        $entityManager->persist($user);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/loginUser", name="login_user")
     */
    public function loginUser(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $entityManager = $this->getDoctrine()->getManager();

        $email = ['email' => $params['email']];
        $password = ['password' => $params['password']];

        dump($params);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBy($email);

        if(!$user){
            return $this->render('index/index.html.twig',['messages' =>['User not exist!']]);

        }
        if($user->getEmail() != $email){
            return $this->render('index/index.html.twig',['messages' =>['User with this email not exist!']]);
        };
        if($user->getPassword() !=$password){
            return $this->render('index/index.html.twig',['messages' =>['Wrong password!']]);
        };
        $user->setIsLogged(true);
        // tell Doctrine you want to (eventually) save the User (no queries yet)
        $entityManager->persist($user);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
        return $this->render('index/index.html.twig',['messages' =>['Succesfully login!']]);
    }

    /**
     * @Route("/user/{id}", name="show_user")
     */
    public function showUser(int $id):Response
    {
        $response = new Response();
        $entityManager = $this->getDoctrine()->getManager();

        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                u.email,
                u.is_logged,
                ud.name, 
                ud.surname, 
                ud.avatar,
                a.postal_code,
                a.city,
                a.street
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\UserDetails ud WITH u.id_user_details=ud.id 
            LEFT JOIN App\Entity\Address a WITH ud.id_address=a.id WHERE u.id =:id
        ')->setParameter('id', $id);
        $result =$query->execute();
        $response->setContent(json_encode($result));
        return $response;
    }

    /**
     * @Route("/showUsers", name="show_all_users")
     */
    public function showAllUsers(): Response
    {
        $response = new Response();
        $entityManager = $this->getDoctrine()->getManager();

        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                u.email,
                u.is_logged,
                ud.name, 
                ud.surname, 
                ud.avatar,
                a.postal_code,
                a.city,
                a.street
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\UserDetails ud WITH u.id_user_details=ud.id 
            LEFT JOIN App\Entity\Address a WITH ud.id_address=a.id
        ');
        $result =$query->execute();
        $response->setContent(json_encode($result));
        return $response;
    }
}
