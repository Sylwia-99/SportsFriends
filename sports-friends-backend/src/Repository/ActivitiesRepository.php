<?php

namespace App\Repository;

use App\Entity\Activities;
use App\Entity\Address;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Activities|null find($id, $lockMode = null, $lockVersion = null)
 * @method Activities|null findOneBy(array $criteria, array $orderBy = null)
 * @method Activities[]    findAll()
 * @method Activities[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivitiesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Activities::class);
    }

    public function addActivity(String $name){
        $entityManager = $this->getEntityManager();

        $activity = new Activities();
        $activity->setName($name);
        try {
            $entityManager->persist($activity);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
        return $activity;
    }

    public function removeActivity(Activities $activity){
        $entityManager = $this->getEntityManager();

        $id = $activity->getId();
        try {
            $entityManager->remove($activity);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
        return $activity;
    }



    public function getAllActivities(){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                a.id,
                a.name
            FROM App\Entity\Activities  a 
       ');
        return $query->execute();
    }

    // /**
    //  * @return Activities[] Returns an array of Activities objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Activities
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
