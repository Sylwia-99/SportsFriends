<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210531212245 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activities (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, postal_code VARCHAR(100) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE logs (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, id_user_sender_id INT NOT NULL, id_user_recipient_id INT NOT NULL, contents LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_DB021E96CBA2837F (id_user_sender_id), INDEX IDX_DB021E9698D49B6D (id_user_recipient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, id_user_details_id INT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, is_logged TINYINT(1) NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649F5230246 (id_user_details_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE follower_watched (id_user_follower INT NOT NULL, id_user_watcher INT NOT NULL, INDEX IDX_91C9A96EE7733C23 (id_user_follower), INDEX IDX_91C9A96EC9438DD4 (id_user_watcher), PRIMARY KEY(id_user_follower, id_user_watcher)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users_activities (user_id INT NOT NULL, activities_id INT NOT NULL, INDEX IDX_629A0071A76ED395 (user_id), INDEX IDX_629A00712A4DB562 (activities_id), PRIMARY KEY(user_id, activities_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_details (id INT AUTO_INCREMENT NOT NULL, id_address_id INT NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, avatar VARCHAR(255) DEFAULT NULL, INDEX IDX_2A2B1580503D2FA2 (id_address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E96CBA2837F FOREIGN KEY (id_user_sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9698D49B6D FOREIGN KEY (id_user_recipient_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F5230246 FOREIGN KEY (id_user_details_id) REFERENCES user_details (id)');
        $this->addSql('ALTER TABLE follower_watched ADD CONSTRAINT FK_91C9A96EE7733C23 FOREIGN KEY (id_user_follower) REFERENCES user (id)');
        $this->addSql('ALTER TABLE follower_watched ADD CONSTRAINT FK_91C9A96EC9438DD4 FOREIGN KEY (id_user_watcher) REFERENCES user (id)');
        $this->addSql('ALTER TABLE users_activities ADD CONSTRAINT FK_629A0071A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_activities ADD CONSTRAINT FK_629A00712A4DB562 FOREIGN KEY (activities_id) REFERENCES activities (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_details ADD CONSTRAINT FK_2A2B1580503D2FA2 FOREIGN KEY (id_address_id) REFERENCES address (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE users_activities DROP FOREIGN KEY FK_629A00712A4DB562');
        $this->addSql('ALTER TABLE user_details DROP FOREIGN KEY FK_2A2B1580503D2FA2');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E96CBA2837F');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E9698D49B6D');
        $this->addSql('ALTER TABLE follower_watched DROP FOREIGN KEY FK_91C9A96EE7733C23');
        $this->addSql('ALTER TABLE follower_watched DROP FOREIGN KEY FK_91C9A96EC9438DD4');
        $this->addSql('ALTER TABLE users_activities DROP FOREIGN KEY FK_629A0071A76ED395');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F5230246');
        $this->addSql('DROP TABLE activities');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE logs');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE follower_watched');
        $this->addSql('DROP TABLE users_activities');
        $this->addSql('DROP TABLE user_details');
    }
}
