<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ActivityRepository::class)
 *  @ORM\Table(name="activity")
 */
class Activity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=UserActivities::class, inversedBy="id_user_activity")
     * @ORM\JoinColumn(nullable=false)
     */
    private $userActivities;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUserActivities(): ?UserActivities
    {
        return $this->userActivities;
    }

    public function setUserActivities(?UserActivities $userActivities): self
    {
        $this->userActivities = $userActivities;

        return $this;
    }
}
