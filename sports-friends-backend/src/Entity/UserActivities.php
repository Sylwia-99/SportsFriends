<?php

namespace App\Entity;

use App\Repository\UserActivitiesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserActivitiesRepository::class)
 * @ORM\Table(name="user_activities")
 */
class UserActivities
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_user;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="userActivities")
     */
    private $id_user_activity;

    public function __construct()
    {
        $this->id_user_activity = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?User
    {
        return $this->id_user;
    }

    public function setIdUser(User $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    /**
     * @return Collection|Activity[]
     */
    public function getIdUserActivity(): Collection
    {
        return $this->id_user_activity;
    }

    public function addIdUserActivity(Activity $idUserActivity): self
    {
        if (!$this->id_user_activity->contains($idUserActivity)) {
            $this->id_user_activity[] = $idUserActivity;
            $idUserActivity->setUserActivities($this);
        }

        return $this;
    }

    public function removeIdUserActivity(Activity $idUserActivity): self
    {
        if ($this->id_user_activity->removeElement($idUserActivity)) {
            // set the owning side to null (unless already changed)
            if ($idUserActivity->getUserActivities() === $this) {
                $idUserActivity->setUserActivities(null);
            }
        }

        return $this;
    }
}
