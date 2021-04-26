<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="user")
 */
class User
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
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="boolean")
     */
    private $is_logged;

    /**
     * @ORM\OneToOne(targetEntity=UserDetails::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_user_details;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="watchers")
     */
    private $followers;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="followers")
     * @ORM\JoinTable(name="follower_watched",
     *     joinColumns={@ORM\JoinColumn(name="id_user_follower", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="id_user_watcher", referencedColumnName="id")}
     * )
     */
    private $watchers;

    /**
     * @ORM\ManyToMany(targetEntity=Activities::class, inversedBy="users")
     * @ORM\JoinTable(name="users_activities")
     */
    private $activities;

    /**
     * @ORM\ManyToOne(targetEntity=Role::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $id_role;

    public function __construct()
    {
        $this->activities = new ArrayCollection();
        $this->watchers = new ArrayCollection();
        $this->followers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getIsLogged(): ?bool
    {
        return $this->is_logged;
    }

    public function setIsLogged(bool $is_logged): self
    {
        $this->is_logged = $is_logged;

        return $this;
    }

    public function getIdUserDetails(): ?UserDetails
    {
        return $this->id_user_details;
    }

    public function setIdUserDetails(UserDetails $id_user_details): self
    {
        $this->id_user_details = $id_user_details;

        return $this;
    }

    public function getIdRole(): ?Role
    {
        return $this->id_role;
    }

    public function setIdRole(Role $id_role): self
    {
        $this->id_role = $id_role;

        return $this;
    }

    /**
     * @return Collection|Activities[]
     */
    public function getUserActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activities $activity)
    {
        if($this->activities->contains($activity)){
            return;
        }
        $this->activities[] = $activity;
        return $this;
    }

    public function removeActivity(Activities $activity)
    {
        if(!$this->activities->contains($activity)){
            return;
        }
        $this->activities->removeElement($activity);
    }

    /**
     * @return Collection|User[]
     */
    public function getUserWatchers(): Collection
    {
        return $this->watchers;
    }

    public function addUserToWatchers(User $watchers)
    {
        if($this->watchers->contains($watchers)){
            return;
        }
        $this->watchers[] = $watchers;
        return $this;
    }

    public function removeWatcher(User $watcher)
    {
        if(!$this->watchers->contains($watcher)){
            return;
        }
        $this->watchers->removeElement($watcher);
    }

}
