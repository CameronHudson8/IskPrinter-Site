<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">        
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{config('app.name')}}</title>

        <!-- Styles -->
		<link rel="stylesheet" href="{{asset('css/app.css')}}">	

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
		<script defer src="js/config.js"></script>
		<script defer src="js/utilities.js"></script>
        <script defer src="js/IskPrinter.js"></script>
        <script defer src="js/characterSelect.js"></script>

		<link rel="icon" href="favicon.png" type="image/png">
    </head>
    <body class="pt-5 mt-5">
        <div id="app"></div> <!-- dummy div that loads Vue dependencies -->
        <example-component></example-component>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary mb-4">
            <a href="/" class="navbar-brand">{{config('app.name')}}</a>
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                @guest
                    <li>
                        <a class="nav-link" href="{{ route('login') }}">{{ __('Log In') }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                    </li>
                @else
                    <li class="nav-item">
                        <a class="nav-link" href="#">Settings</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">{{ Auth::user()->name }}<span class="caret"></span></a>
                        <div id="character" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown">
                            @if($characters)
                                @foreach($characters as $character)
                                    <a class="dropdown-item" href="#" id={{$character->character_id}} onclick="makeActive(this);">{{$character->characterName}}</a>
                                @endforeach()
                                <div class="dropdown-divider"></div>
                            @endif
                            <a class="dropdown-item alert-success" href="{{ EveAuth::LOGON_URL() }}">{{ __('Add Character') }}</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item alert-danger" href="#">Remove Character</a>
                            <div class="dropdown-divider"></div>

                            <a class="dropdown-item" href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                {{ __('Log Out') }}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </li>
                @endguest
            </ul>
            </div>
        </nav>

        <div class="container">
            <div class="jumbotron">

                    <h1 class="text-center">{{config('app.name')}}</h1>
                    <div class="text-center">
                    @guest
                        <p>To begin, please log in or register.</p>
                        <a class="btn btn-primary btn-lg" href="{{ route('login') }}">{{ __('Log In') }}</a>
                        <a class="btn btn-secondary btn-lg" href="{{ route('register') }}">{{ __('Register') }}</a>
                    @else
                        {{-- <form class="form-inline d-flex justify-content-center mb-4">
                            <label for="station" class="d-inline-flex p-2">Select station</label>
                            <select id="station" class="form-control d-inline-flex p-2">
                                <option value=1022734985679 selected>1DQ1-A - 1-st Thetastar of Dickbutt</option>
                                <option value=1024576111149>5BTK-M - The Dawg Haus</option>
                            </select>
                        </form> --}}
                        <a href="#"><input class="btn btn-primary mb-4" type="button" value="Start Printing" onclick="IskPrinter()" /></a>
                        <br>
                        <p id="status"></p>
                        </div>
                        <div id="tableDiv" class="mb-4 d-flex justify-content-center"></div>
                    @endguest

            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    </body>
</html>
