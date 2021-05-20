<?php

namespace App\Repository;

use App\Entity\Messages;
use App\Entity\Role;
use App\Entity\User;
use App\Entity\UserDetails;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;
use PhpParser\Node\Scalar\String_;
use Symfony\Component\HttpFoundation\Response;

/**
 * @method Messages|null find($id, $lockMode = null, $lockVersion = null)
 * @method Messages|null findOneBy(array $criteria, array $orderBy = null)
 * @method Messages[]    findAll()
 * @method Messages[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessagesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Messages::class);
    }

    public function addMessage(User $idUserSender, User $idUserRecipient, String $contents):Messages{
        $entityManager = $this->getEntityManager();
        $date = new DateTime();
        $message = new Messages();
        $message->setIdUserSender($idUserSender);
        $message->setIdUserRecipient($idUserRecipient);
        $message->setContents($contents);
        $message->setCreatedAt($date);
        try {
            $entityManager->persist($message);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
        return $message;
    }

    public function getSentMessages(int $id){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                m.contents,
                m.created_at,
                ud.name,
                ud.surname,
                ud.avatar
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\Messages m WITH u.id=m.id_user_sender
            LEFT JOIN App\Entity\User uu WITH uu.id =m.id_user_recipient
            LEFT JOIN App\Entity\UserDetails ud WITH ud.id=uu.id_user_details
            WHERE u.id =:id
        ')->setParameter('id', $id);
        return $query->execute();
    }

    public function getReceivedMessages(int $id){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                m.contents,
                m.created_at,
                ud.name,
                ud.surname,
                ud.avatar
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\Messages m WITH u.id=m.id_user_recipient
            LEFT JOIN App\Entity\User uu WITH uu.id =m.id_user_sender
            LEFT JOIN App\Entity\UserDetails ud WITH ud.id=uu.id_user_details
            WHERE u.id =:id
        ')->setParameter('id', $id);
        return $query->execute();
    }
    // /**
    //  * @return Messages[] Returns an array of Messages objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Messages
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
