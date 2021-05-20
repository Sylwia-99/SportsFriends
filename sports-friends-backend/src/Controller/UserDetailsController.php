<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use App\Entity\UserDetails;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserDetailsController extends AbstractController
{
    /**
     * @Route("/detailsuser", name="add_user_details")
     */
    public function createUserDetails(): Response
    {
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $userDetails = new UserDetails();
        $userDetails->setName('Sylwia');
        $userDetails->setSurname('Rusek');
        $address = new Address();
        $idAddress = $address->getId()::String;
        $userDetails->setIdAddress($idAddress);


        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($userDetails);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new userDetails with id '.$userDetails->getId());
    }

    /**
     * @Route("/details/{id}", name="show_user_details")
     */
    public function showUserDetails(int $id): Response
    {
        $userDetails = $this->getDoctrine()
            ->getRepository(UserDetails::class)
            ->find($id);

        if (!$userDetails) {
            throw $this->createNotFoundException(
                'No user found for id '.$id
            );
        }

        return new Response($userDetails->getName());
    }

    /**
     * @Route("/api/changeUserNameSurname/{id}", name="change_user_name_surname")
     */
    public function changeNameSurname(Request $request, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);

        $name = $params['body']['name'];
        $surname = $params['body']['surname'];
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);
        $idUserDetails = $user->getIdUserDetails()->getId();

        $this->getDoctrine()
            ->getRepository(UserDetails::class)
            ->changeUserNameSurname($idUserDetails,$name, $surname);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/changeUserAvatar/{id}", name="change_user_avatar")
     */
    public function changeUserAvatar(Request $request, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);
        $idUserDetails = $user->getIdUserDetails()->getId();
        /*$this->getDoctrine()
            ->getRepository(UserDetails::class)
            ->changeUserAvatar($idUserDetails,$params['avatar']);*/

        return $this->render('index/index.html.twig');
    }

}
