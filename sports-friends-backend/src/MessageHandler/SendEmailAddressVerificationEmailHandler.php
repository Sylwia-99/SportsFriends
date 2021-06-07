<?php


namespace App\MessageHandler;

use App\Message\UserRegistered;
use Twig\Environment;

class SendEmailAddressVerificationEmailHandler
{
    private $mailer;
    private $twig;

    public function __construct(\Swift_Mailer $mailer, Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function __invoke(UserRegistered $userRegistered){
        $user = $userRegistered->getUser();

        $message = (new \Swift_Message('Zweryfikuj adres email'))
            ->setFrom('sportsfriend@sf.com')
            ->setTo($user->getEmail())
            ->setBody(
                $this->twig->render(
                // templates/emails/registration.html.twig
                    'email/registration.html.twig',
                    array('user' => $user)
                ),
                'text/html'
            )

            // you can remove the following code if you don't define a text version for your emails
            ->addPart(
                $this->twig->render(
                // templates/emails/registration.txt.twig
                    'email/registration.txt.twig',
                    array('user' => $user)
                ),
                'text/plain'
            )
        ;

        $this->mailer->send($message);
        dump('dziala');
    }
}