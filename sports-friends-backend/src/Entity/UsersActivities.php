<?php

namespace App\Entity;

use App\Repository\UsersActivitiesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UsersActivitiesRepository::class)
 * @ORM\Table(name="user_activities")
 */
class UsersActivities
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="usersActivities")
     */
    private $id_user;

    /**
     * @ORM\ManyToMany(targetEntity=Activities::class, inversedBy="usersActivities")
     */
    private $id_activity;

    public function __construct()
    {
        $this->id_user = new ArrayCollection();
        $this->id_activity = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getIdUser(): Collection
    {
        return $this->id_user;
    }

    public function addIdUser(User $idUser): self
    {
        if (!$this->id_user->contains($idUser)) {
            $this->id_user[] = $idUser;
        }

        return $this;
    }

    public function removeIdUser(User $idUser): self
    {
        $this->id_user->removeElement($idUser);

        return $this;
    }

    /**
     * @return Collection|Activities[]
     */
    public function getIdActivity(): Collection
    {
        return $this->id_activity;
    }

    public function addIdActivity(Activities $idActivity): self
    {
        if (!$this->id_activity->contains($idActivity)) {
            $this->id_activity[] = $idActivity;
        }

        return $this;
    }

    public function removeIdActivity(Activities $idActivity): self
    {
        $this->id_activity->removeElement($idActivity);

        return $this;
    }
}
