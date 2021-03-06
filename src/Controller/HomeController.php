<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController {
    /**
     * @Route("/")
     */
    public function homepage() {
        return $this->render('pages/homepage.html.twig');
    }
}
