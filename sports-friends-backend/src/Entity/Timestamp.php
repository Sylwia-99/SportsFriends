<?php
namespace App\Entity;

trait Timestamp
{
    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @ORM\PrePersist()
     */
    public function prePersist()
        {
            $this->createdAt = new \DateTime();
        }
}
