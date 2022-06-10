class Users::RegistrationsController < Devise::RegistrationsController
  before_action :check_referal , only: :create 
  # before_action :require_no_authentication, only: [:create]
  # skip_before_action :verify_authenticity_token

  respond_to :json
  private

  def check_referal
    if params[:referral].present?
      @referralby = User.find_by(referral_code: params[:referral])
      if @referralby.referrals.pluck(:invitation_email).include?(params[:user][:email])
        Referral.where(invitation_email: params[:user][:email], user_id: @referralby.id).last.update(is_referal_used: true) rescue ""
      end
    end
  end

  def respond_with(resource, _opts = {})
    resource.persisted? ? register_success : register_failed
  end
  def register_success
    render json: { message: 'Signed up.' }, status: :ok
  end
  def register_failed
    render json: {staus: 400,error: "user already exists"}, status: 400
  end
end