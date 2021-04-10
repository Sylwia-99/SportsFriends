<?php

namespace App\Repository;

use App\Entity\UserActivities;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserActivities|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserActivities|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserActivities[]    findAll()
 * @method UserActivities[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserActivitiesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserActivities::class);
    }

    // /**
    //  * @return UserActivities[] Returns an array of UserActivities objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserActivities
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
