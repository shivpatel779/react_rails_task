class Api::V1::ReferralsController < ApplicationController
	before_action :authenticate_req!	
	skip_before_action :verify_authenticity_token
	# skip_before_action :verify_authenticity_token, only: [:create]

	def create
		@user = current_user
		if @user.present?
			@user.referrals.new(invitation_email: params[:invitation_email])
			@send_to = params[:invitation_email]
			if @user.save
				UserMailer.send_invitation(@send_to, @user).deliver
				render json: { message: 'successfull!' }, status: :ok
			else
				render json: {status: 400, message: 'Authantication failed!' }, status: 400
			end
		else
			render json: {status: 401,error: "unauthorized"},status: 401
		end
	end
end
