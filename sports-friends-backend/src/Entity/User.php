<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
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
     * @ORM\OneToMany(targetEntity=Role::class, mappedBy="user")
     */
    private $id_role;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     * @ORM\JoinTable(name="user_follower")
     */
    private $followers;

    /**
     * @ORM\ManyToMany(targetEntity=User::class)
     * @ORM\JoinTable(name="user_watcher")
     */
    private $watchers;

    public function __construct()
    {
        $this->id_role = new ArrayCollection();
        $this->followers = new ArrayCollection();
        $this->watchers = new ArrayCollection();
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

    /**
     * @return Collection|Role[]
     */
    public function getIdRole(): Collection
    {
        return $this->id_role;
    }

    public function addIdRole(Role $idRole): self
    {
        if (!$this->id_role->contains($idRole)) {
            $this->id_role[] = $idRole;
            $idRole->setUser($this);
        }

        return $this;
    }

    public function removeIdRole(Role $idRole): self
    {
        if ($this->id_role->removeElement($idRole)) {
            // set the owning side to null (unless already changed)
            if ($idRole->getUser() === $this) {
                $idRole->setUser(null);
            }
        }

        return $this;
    }
}
