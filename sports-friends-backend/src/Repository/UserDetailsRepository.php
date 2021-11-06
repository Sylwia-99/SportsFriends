<?php

namespace App\Repository;

use App\Entity\Address;
use App\Entity\UserDetails;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserDetails|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserDetails|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserDetails[]    findAll()
 * @method UserDetails[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserDetailsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserDetails::class);
    }

    public function addUserDatails(String $name, String $surname, String $avatar, Address $address):UserDetails{
        $entityManager = $this->getEntityManager();

        $userDetails = new UserDetails();
        $userDetails->setName($name);
        $userDetails->setSurname($surname);
        $userDetails->setAvatar($avatar);
        $userDetails->setIdAddress($address);
        try {
            $entityManager->persist($userDetails);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
        return $userDetails;
    }

    public function removeUserDatails(int $id){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            DELETE 
            FROM user_details
            WHERE id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAllAssociative();
    }

    public function changeUserNameSurname(int $id,String $name, String $surname){
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery('
            UPDATE App\Entity\UserDetails u SET u.name=:name, u.surname=:surname
                WHERE u.id=:id
        ')
            ->setParameter('name', $name)
            ->setParameter('surname', $surname)
            ->setParameter('id', $id);
        return $query->execute();
    }

    public function changeUserAvatar(int $id,String $avatar){
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery('
            UPDATE App\Entity\UserDetails u SET u.avatar=:avatar
                WHERE u.id=:id
        ')
            ->setParameter('avatar', $avatar)
            ->setParameter('id', $id);
        return $query->execute();
    }
    // /**
    //  * @return UserDetails[] Returns an array of UserDetails objects
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
    public function findOneBySomeField($value): ?UserDetails
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
