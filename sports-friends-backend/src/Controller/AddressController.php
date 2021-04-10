<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Address;
use Doctrine\ORM\EntityManagerInterface;

class AddressController extends AbstractController
{
    /**
     * @Route("/address", name="add_address")
     */
    public function createAddress(): Response
    {
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();

        $address = new Address();
        $address->setCity('Jerzmanowice');
        $address->setPostalCode('32-048');
        $address->setStreet('Saspow');

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($address);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new address with id '.$address->getId());
    }
}
