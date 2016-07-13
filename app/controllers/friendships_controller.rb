class FriendshipsController < ApplicationController
  protect_from_forgery except: :create

  def create
    @user = User.find(params[:to_user_id])
    if current_user.from_friend?(@user) || current_user.to_friend?(@user)
      redirect_to root_path
    else
      current_user.friends(@user)
      redirect_to root_path
    end
  end

  def destroy
  end
end