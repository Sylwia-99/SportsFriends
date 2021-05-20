<?php

namespace App\Controller;

use App\Entity\Activities;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActivitiesController extends AbstractController
{
    /**
     * @Route("/api/addActivity", name="add_activity")
     */
    public function addActivity(Request $request):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);

        $activity = $this->getDoctrine()
            ->getRepository(Activities::class);
        $name = $params['name'];
        $activity->addActivity($name);
        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/addUserActivity/{id}", name="add_user_activity")
     */
    public function addUserActivity(Request $request, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        $name = ['name' => $params['body']['addActivity']];
        $activity = $this->getDoctrine()
            ->getRepository(Activities::class)
            ->findOneBy($name);

        $this->getDoctrine()
            ->getRepository(User::class)
            ->addUserActivity($user, $activity);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/api/removeUserActivity/{id}", name="remove_user_activity")
     */
    public function removeUserActivity(Request $request, int $id):Response
    {
        $params = $request->getContent();
        $params = json_decode($params, true);
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->find($id);

        dump($params);
        $idActivity = ['id' => $params['body']['removeActivity']];
        $activity = $this->getDoctrine()
            ->getRepository(Activities::class)
            ->findOneBy($idActivity);

        $this->getDoctrine()
            ->getRepository(User::class)
            ->removeUserActivity($user, $activity);

        return $this->render('index/index.html.twig');
    }

    /**
     * @Route("/getAllActivities", name="get_all_activities")
     */
    public function getAllActivities():Response
    {
        $response = new Response();

        $activities = $this->getDoctrine()
            ->getRepository(Activities::class)
            ->getAllActivities();

        dump($activities);
        $response->setContent(json_encode($activities));
        return $response;
    }
}
