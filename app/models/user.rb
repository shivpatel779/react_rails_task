class User < ApplicationRecord
   devise  :database_authenticatable, :registerable,
   :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist

  has_many :referrals

  after_create do
    @random_code = SecureRandom.urlsafe_base64(5).gsub(/-|_/,('a'..'z').to_a[rand(26)])
    self.update(referral_code: @random_code)
  end
end
