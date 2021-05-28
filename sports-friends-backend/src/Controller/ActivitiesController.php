<?php

namespace App\Controller;

use App\Entity\Activities;
use App\Entity\User;
use App\Repository\ActivitiesRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActivitiesController extends AbstractController
{
    /**
     * @Route("/api/addActivity", name="add_activity")
     */
    public function addActivity(Request $request, ActivitiesRepository $activitiesRepository):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $name = $params['name'];
        $activitiesRepository->addActivity($name);
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/addUserActivity/{id}", name="add_user_activity")
     */
    public function addUserActivity(Request $request, UserRepository $userRepository, ActivitiesRepository $activitiesRepository, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $userRepository->find($id);

        $name = ['name' => $params['body']['addActivity']];
        $activity = $activitiesRepository->findOneBy($name);

        $userRepository->addUserActivity($user, $activity);

        $response = new Response();
        $response->setContent(json_encode("User's activity has added"));
        return $response;
    }

    /**
     * @Route("/api/removeUserActivity/{id}", name="remove_user_activity")
     */
    public function removeUserActivity(Request $request, UserRepository $userRepository, ActivitiesRepository $activitiesRepository, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $userRepository->find($id);

        $idActivity = ['id' => $params['body']['removeActivity']];
        $activity = $activitiesRepository->findOneBy($idActivity);

        $userRepository->removeUserActivity($user, $activity);

        $response = new Response();
        $response->setContent(json_encode("User's activity has removed"));
        return $response;
    }

    /**
     * @Route("/getAllActivities", name="get_all_activities")
     */
    public function getAllActivities(ActivitiesRepository $activitiesRepository):Response
    {
        $response = new Response();
        $activities = $activitiesRepository->getAllActivities();
        $response->setContent(json_encode($activities));
        return $response;
    }
}
