<?php

namespace App\Repository;

use App\Entity\Activities;
use App\Entity\User;
use App\Entity\UserDetails;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function addUser(String $email, String $password, UserDetails $userDetails, UserPasswordEncoderInterface $encoder):User{
        $entityManager = $this->getEntityManager();

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($encoder->encodePassword($user, $password));
        $user->setIdUserDetails($userDetails);
        $user->setIsLogged(false);
        //$user->setRoles(array('ROLE_ADMIN'));
        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
        return $user;
    }

    public function loginUser(String $email, bool $isLogin){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            UPDATE App\Entity\User u SET u.is_logged=:true
                WHERE u.email=:email
        ')
            ->setParameter('email', $email)
            ->setParameter('true', $isLogin);
        return $query->execute();
    }

    public function getUser(int $id){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                u.email,
                u.is_logged,
                u.roles,
                ud.name, 
                ud.surname, 
                ud.avatar,
                a.postal_code,
                a.city,
                a.street
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\UserDetails ud WITH u.id_user_details=ud.id 
            LEFT JOIN App\Entity\Address a WITH ud.id_address=a.id
            WHERE u.id =:id
        ')->setParameter('id', $id);
        return $query->execute();
    }

    public function getAllUsers(){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                u.email,
                u.is_logged,
                ud.name, 
                ud.surname, 
                ud.avatar,
                a.postal_code,
                a.city,
                a.street
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\UserDetails ud WITH u.id_user_details=ud.id 
            LEFT JOIN App\Entity\Address a WITH ud.id_address=a.id
        ');
        return $query->execute();
    }

    public function getSearchedUsers(String $name, String $surname){
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('
            SELECT 
                u.id,
                ud.name,
                ud.surname, 
                ud.avatar
            FROM App\Entity\User u 
            LEFT JOIN App\Entity\UserDetails ud WITH u.id_user_details=ud.id 
            WHERE ud.name LIKE ?1 OR ud.surname LIKE ?2
        ')->setParameter(1, '%'.$name.'%')
            ->setParameter(2, '%'.$surname.'%');
        return $query->execute();
    }

    public function addUserActivity(User $user, Activities $activity){
        $entityManager = $this->getEntityManager();
        $user->addActivity($activity);

        try {
            $entityManager->persist($user);
            $entityManager->persist($activity);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
    }

    public function removeUserActivity(User $user, Activities $activity){
        $entityManager = $this->getEntityManager();
        $user->removeActivity($activity);

        try {
            $entityManager->persist($user);
            $entityManager->persist($activity);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
    }

    public function getAllUserActivities(int $id){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            SELECT 
                a.id,
                a.name
            FROM user u 
            LEFT JOIN users_activities ua ON u.id=ua.user_id 
            LEFT JOIN activities a ON ua.activities_id=a.id WHERE u.id=:id
        ';

        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAllAssociative();
    }

    public function addWatchedUser(User $user, User $newWatch){
        $entityManager = $this->getEntityManager();
        $user->addUserToWatchers($newWatch);

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
    }

    public function removeWatchedUser(User $follower, User $watcher){
        $entityManager = $this->getEntityManager();
        $follower->removeWatcher($watcher);

        try {
            $entityManager->persist($follower);
            $entityManager->flush();
        } catch (ORMException $e) {
        }
    }

    public function getAllWatchedUsers(int $id){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            SELECT
                u.id,
                fw.id_user_watcher,
                ud.name,
                ud.surname,
                ud.avatar
            FROM user u
            LEFT JOIN follower_watched fw ON u.id=fw.id_user_follower
            LEFT JOIN user uu ON uu.id =fw.id_user_watcher
            LEFT JOIN user_details ud ON uu.id_user_details_id = ud.id 
            WHERE u.id=:id
        ';
        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAllAssociative();
    }

    public function getAllFollowerUsers(int $id){
        $entityManager = $this->getEntityManager()->getConnection();
        $query = '
            SELECT
                u.id,
                fw.id_user_follower,
                ud.name,
                ud.surname,
                ud.avatar
            FROM user u
                     LEFT JOIN follower_watched fw ON u.id=fw.id_user_watcher
                     LEFT JOIN user uu ON uu.id =fw.id_user_follower
                     LEFT JOIN user_details ud ON uu.id_user_details_id = ud.id
            WHERE u.id=:id
        ';
        $stmt = $entityManager->prepare($query);
        $stmt->execute(['id' => $id]);

        return $stmt->fetchAllAssociative();
    }

    public function changeUserPassword(String $email, String $password, UserPasswordEncoderInterface $encoder){
        $entityManager = $this->getEntityManager();
        $email = ['email' => $email];
        $user =$entityManager ->getRepository(User::class)
            ->findOneBy($email);

        $query = $entityManager->createQuery('
            UPDATE App\Entity\User u SET u.password=:password
                WHERE u.email=:email
        ')
            ->setParameter('password', $encoder->encodePassword($user, $password))
            ->setParameter('email', $email);
        return $query->execute();
    }

    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    // /**
    //  * @return User[] Returns an array of User objects
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
    public function findOneBySomeField($value): ?User
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
