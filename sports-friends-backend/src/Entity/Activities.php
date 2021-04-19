<?php

namespace App\Entity;

use App\Repository\ActivitiesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ActivitiesRepository::class)
 * @ORM\Table(name="activities")
 */
class Activities
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Activities::class, mappedBy="id_activity")
     */
    private $usersActivities;

    public function __construct()
    {
        $this->usersActivities = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|UsersActivities[]
     */
    public function getUsersActivities(): Collection
    {
        return $this->usersActivities;
    }

    public function addUsersActivity(UsersActivities $usersActivity): self
    {
        if (!$this->usersActivities->contains($usersActivity)) {
            $this->usersActivities[] = $usersActivity;
            $usersActivity->addIdActivity($this);
        }

        return $this;
    }

    public function removeUsersActivity(UsersActivities $usersActivity): self
    {
        if ($this->usersActivities->removeElement($usersActivity)) {
            $usersActivity->removeIdActivity($this);
        }

        return $this;
    }
}
