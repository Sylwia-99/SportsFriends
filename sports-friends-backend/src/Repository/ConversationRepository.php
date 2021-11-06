<?php

namespace App\Repository;

use App\Entity\Conversation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;
/**
 * @method Conversation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Conversation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Conversation[]    findAll()
 * @method Conversation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConversationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Conversation::class);
    }

    public function findConversationByParticipants(int $otherUserId, int $myId){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT p.conversation
            FROM App\Entity\Participant p
            INNER JOIN App\Entity\Conversation c
            WITH p.conversation = c.id
            WHERE p.user =:me OR p.user =:otherUser
        ')
            ->setParameter('otherUser', $otherUserId)
            ->setParameter('me', $myId);
        return $query->execute()->getResult();
        /*$qb = $this->createQueryBuilder('c');
        $qb
            ->select($qb->expr()->count('p.conversation'))
            ->innerJoin('c.participants', 'p')
            ->where(
                $qb->expr()->orX(
                    $qb->expr()->eq('p.user', ':me'),
                    $qb->expr()->eq('p.user', ':otherUser')
                )
            )
            ->groupBy('p.conversation')
            ->having(
                $qb->expr()->eq(
                    $qb->expr()->count('p.conversation'),
                    2
                )
            )
            ->setParameters([
                'me' => $myId,
                'otherUser' => $otherUserId
            ])
        ;

        return $qb->getQuery()->getResult();*/
    }

    public function findConversationsByUsers(int $otheUserId, int $userId)
    {
        $qb = $this->createQueryBuilder('c');
        $qb->
        select('otherUser.email', 'c.id as conversationId', 'lm.content', 'lm.createdAt')
            ->innerJoin('c.participants', 'p', Join::WITH, $qb->expr()->eq('p.user', ':otherUser'))
            ->innerJoin('c.participants', 'me', Join::WITH, $qb->expr()->eq('me.user', ':user'))
            ->leftJoin('c.last_message', 'lm')
            ->innerJoin('me.user', 'meUser')
            ->innerJoin('p.user', 'otherUser')
            ->where('meUser.id = :user')
            ->setParameter('user', $userId)
            ->setParameter('otherUser', $otheUserId)
            ->orderBy('lm.createdAt', 'DESC')
        ;

        return $qb->getQuery()->getOneOrNullResult();
    }

    public function findConversationsByUser(int $userId)
    {
        $qb = $this->createQueryBuilder('c');
        $qb->
        select('otherUser.email', 'c.id as conversationId', 'lm.content', 'lm.createdAt')
            ->innerJoin('c.participants', 'p', Join::WITH, $qb->expr()->neq('p.user', ':user'))
            ->innerJoin('c.participants', 'me', Join::WITH, $qb->expr()->eq('me.user', ':user'))
            ->leftJoin('c.last_message', 'lm')
            ->innerJoin('me.user', 'meUser')
            ->innerJoin('p.user', 'otherUser')
            ->where('meUser.id = :user')
            ->setParameter('user', $userId)
            ->orderBy('lm.createdAt', 'DESC')
        ;

        return $qb->getQuery()->getResult();
    }

    public function checkIfUserisParticipant(int $conversationId, int $userId)
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT
                *
            FROM App\Entity\Participant p
            INNER JOIN App\Entity\Conversation c
            WITH p.conversation = c.id
            WHERE c.id =:conversationId AND p.user =:userId
        ')
            ->setParameter('conversationId', $conversationId)
            ->setParameter('userId', $userId);
        return $query->execute();
    }

    public function removeConversationById(int $id){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            DELETE 
            FROM conversation
            WHERE id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAllAssociative();
    }

    public function setLastMessageIdOnNull(int $conversationId){
        $entityManager = $this->getEntityManager()->getConnection();

        $query = '
            UPDATE conversation c SET c.last_message_id=:null
                WHERE c.id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(array(':null' =>null, ':id'=>$conversationId));

        return $stmt->fetchAllAssociative();
    }

    // /**
    //  * @return Conversation[] Returns an array of Conversation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Conversation
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
