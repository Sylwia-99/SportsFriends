<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AddressRepository::class)
 * @ORM\Table(name="address")
 */
class Address
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $postal_code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $street;

    /**
     * @ORM\OneToMany(targetEntity=UserDetails::class, mappedBy="id_address")
     */
    private $userDetails;

    public function __construct()
    {
        $this->userDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostalCode(): ?string
    {
        return $this->postal_code;
    }

    public function setPostalCode(string $postal_code): self
    {
        $this->postal_code = $postal_code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    /**
     * @return Collection|UserDetails[]
     */
    public function getUserDetails(): Collection
    {
        return $this->userDetails;
    }

    public function addUserDetail(UserDetails $userDetail): self
    {
        if (!$this->userDetails->contains($userDetail)) {
            $this->userDetails[] = $userDetail;
            $userDetail->setIdAddress($this);
        }

        return $this;
    }

    public function removeUserDetail(UserDetails $userDetail): self
    {
        if ($this->userDetails->removeElement($userDetail)) {
            // set the owning side to null (unless already changed)
            if ($userDetail->getIdAddress() === $this) {
                $userDetail->setIdAddress(null);
            }
        }

        return $this;
    }
}
