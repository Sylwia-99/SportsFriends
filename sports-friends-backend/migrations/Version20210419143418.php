<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210419143418 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE users_activities (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_activities_user (users_activities_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_B34B5B2E23A8BD6F (users_activities_id), INDEX IDX_B34B5B2EA76ED395 (user_id), PRIMARY KEY(users_activities_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_activities_activities (users_activities_id INT NOT NULL, activities_id INT NOT NULL, INDEX IDX_2463BDC823A8BD6F (users_activities_id), INDEX IDX_2463BDC82A4DB562 (activities_id), PRIMARY KEY(users_activities_id, activities_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE users_activities_user ADD CONSTRAINT FK_B34B5B2E23A8BD6F FOREIGN KEY (users_activities_id) REFERENCES users_activities (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_activities_user ADD CONSTRAINT FK_B34B5B2EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_activities_activities ADD CONSTRAINT FK_2463BDC823A8BD6F FOREIGN KEY (users_activities_id) REFERENCES users_activities (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_activities_activities ADD CONSTRAINT FK_2463BDC82A4DB562 FOREIGN KEY (activities_id) REFERENCES activities (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users_activities_user DROP FOREIGN KEY FK_B34B5B2E23A8BD6F');
        $this->addSql('ALTER TABLE users_activities_activities DROP FOREIGN KEY FK_2463BDC823A8BD6F');
        $this->addSql('DROP TABLE users_activities');
        $this->addSql('DROP TABLE users_activities_user');
        $this->addSql('DROP TABLE users_activities_activities');
    }
}
