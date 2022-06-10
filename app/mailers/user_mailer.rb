class UserMailer < ApplicationMailer
	def send_invitation(send_to ,user)
	    @send_to = send_to
	    @user = user
	    @message = "referral code"
	    mail(to: @send_to, from: 'test@gmail.com', subject: @message)
	end
end
