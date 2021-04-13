<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use App\Entity\UserDetails;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/register123", name="add_user")
     */
    public function createUser(Request $request)
    {
        $params = dump($request->request->all());
        $entityManager = $this->getDoctrine()->getManager();


        $userDetails = new UserDetails();
        $userDetails->setName($params['name']);
        $userDetails->setSurname($params['surname']);
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
        $entityManager->persist($user);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();
    }

    /**
     * @Route("/user/{id}", name="show_user")
     * @return UserDetails
     */
    public function showUser(int $id):UserDetails
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        if (!$user) {
            throw $this->createNotFoundException(
                'No user found for id '.$id
            );
        }

        return $user->getIdUserDetails();
    }

    /**
     * @Route("/allusers", name="show_all_users")
     */
    public function getUsers(): Response
    {
        $users = $this->getDoctrine()
            ->getRepository(User::class)
            ->findAll();

        return new Response($users);
    }
}
