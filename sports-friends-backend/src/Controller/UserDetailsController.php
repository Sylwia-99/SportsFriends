<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\User;
use App\Entity\UserDetails;
use App\Repository\UserDetailsRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class UserDetailsController extends AbstractController
{
    /**
     * @Route("/api/changeUserNameSurname/{id}", name="change_user_name_surname")
     */
    public function changeNameSurname(Request $request, UserRepository $userRepository, UserDetailsRepository  $userDetailsRepository, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);

        $name = $params['body']['name'];
        $surname = $params['body']['surname'];
        $user = $userRepository->find($id);
        $idUserDetails = $user->getIdUserDetails()->getId();

        $userDetailsRepository->changeUserNameSurname($idUserDetails,$name, $surname);

        $response = new Response();
        $response->setContent(json_encode('Name and surname has changed'));
        return $response;
    }

    /**
     * @Route("/changeUserAvatar/{id}", name="change_user_avatar")
     */
    public function changeUserAvatar(Request $request,UserRepository $userRepository, UserDetailsRepository  $userDetailsRepository, int $id, SluggerInterface $slugger):Response
    {
        $file = $request->files->get('avatar', array(), true);
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
        $file->move($this->getParameter('upload_directory'), $newFilename);

        $user = $userRepository->find($id);
        $idUserDetails = $user->getIdUserDetails()->getId();
        $userDetailsRepository->changeUserAvatar($idUserDetails,$newFilename);

        $response = new Response();
        $response->setContent(json_encode('Avatar has changed'));
        return $response;
    }

}
