Rails.application.routes.draw do

  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resource :referrals
    end
  end
  get '*path', to: 'pages#index', via: :all
  devise_for :users,
               path: '',
               path_names: {
                 sign_in: 'login',
                 sign_out: 'logout'
               },
               controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'

               }    

devise_scope :user do
  post '/sign_up'    => 'users/registrations#create'
  get '/sign_up',to: "users/registrations#new"
                
end

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
