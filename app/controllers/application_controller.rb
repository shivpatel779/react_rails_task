class ApplicationController < ActionController::Base
	protect_from_forgery except: :sign_in
	 def authenticate_req!
		if user_signed_in?
			authenticate_user!
		else
			render json: {succes: 401,message: "Unauthenticated"},status: 401
		end
	 end
end
