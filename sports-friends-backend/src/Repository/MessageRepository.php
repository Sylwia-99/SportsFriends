<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findMessageByConversationId(int $conversationId){

        /*$entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT
                m.id,
                m.content,
                m.user,
                m.conversation
            FROM App\Entity\Message m
            WHERE m.conversation =:conversationId 
        ')
            ->setParameter('conversationId', $conversationId);
        return $query->execute();*/
        $qb = $this->createQueryBuilder('m');
        $qb->where('m.conversation = :conversationId')
            ->setParameter('conversationId', $conversationId)
        ;

        return $qb->getQuery()->getResult();
    }

    public function findConversationsByUserId(int $userId){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            SELECT 
                m.conversation_id
            FROM message m 
            WHERE m.user_id=:id
        ';
        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $userId]);

        return $stmt->fetchAllAssociative();
    }

    public function removeMessageByUserId(int $userId){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            DELETE 
            FROM message
            WHERE user_id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $userId]);

        return $stmt->fetchAllAssociative();
    }

    public function removeMessageByByConversationId(int $conversationId){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            DELETE 
            FROM message
            WHERE conversation_id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $conversationId]);

        return $stmt->fetchAllAssociative();
    }

    // /**
    //  * @return Message[] Returns an array of Message objects
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
    public function findOneBySomeField($value): ?Message
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
