<?php

namespace App\Repository;

use App\Entity\FollowerWatched;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FollowerWatched|null find($id, $lockMode = null, $lockVersion = null)
 * @method FollowerWatched|null findOneBy(array $criteria, array $orderBy = null)
 * @method FollowerWatched[]    findAll()
 * @method FollowerWatched[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FollowerWatchedRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FollowerWatched::class);
    }

    // /**
    //  * @return FollowerWatched[] Returns an array of FollowerWatched objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FollowerWatched
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
