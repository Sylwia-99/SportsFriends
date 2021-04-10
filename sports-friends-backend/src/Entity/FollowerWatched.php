<?php

namespace App\Entity;

use App\Repository\FollowerWatchedRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FollowerWatchedRepository::class)
 * @ORM\Table(name="follower_watched")
 */
class FollowerWatched
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     */
    private $id_user_follower;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     */
    private $id_user_watched;

    public function __construct()
    {
        $this->id_user_follower = new ArrayCollection();
        $this->id_user_watched = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getIdUserFollower(): Collection
    {
        return $this->id_user_follower;
    }

    public function addIdUserFollower(User $idUserFollower): self
    {
        if (!$this->id_user_follower->contains($idUserFollower)) {
            $this->id_user_follower[] = $idUserFollower;
        }

        return $this;
    }

    public function removeIdUserFollower(User $idUserFollower): self
    {
        $this->id_user_follower->removeElement($idUserFollower);

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getIdUserWatched(): Collection
    {
        return $this->id_user_watched;
    }

    public function addIdUserWatched(User $idUserWatched): self
    {
        if (!$this->id_user_watched->contains($idUserWatched)) {
            $this->id_user_watched[] = $idUserWatched;
        }

        return $this;
    }

    public function removeIdUserWatched(User $idUserWatched): self
    {
        $this->id_user_watched->removeElement($idUserWatched);

        return $this;
    }
}
