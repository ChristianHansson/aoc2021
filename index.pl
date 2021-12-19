#!/usr/bin/perl
print `clear`;
use Data::Dumper;
use Cwd 'abs_path';
sub read_file {
	open(my $f, "<" ,shift) or die();
	my $content = do { local $/; <$f> };
	close($f);
	return $content;
}
my $file = abs_path . "/data/" . ($ARGV[0] ? 'test_data.txt' : 'data.txt');
if (!-e $file){exit;}

my @items = split(",", read_file($file));
my $len = scalar @items;

my @sorted = sort {$a <=> $b} @items;
my $max = $sorted[-1];
my $min = $sorted[0];
# print Dumper \@sorted, $min, $max;
# print Dumper $max, $min;

my $least_sum;
# for my $i (0..$len - 1)
for my $i ($min..$max)
{
	# next unless $i == 5;
	my $sum = traverse_to($i);
	# print qq^$i - $sum\n^;
	# last;
	if (!$least_sum){$least_sum = $sum;}
	elsif($sum < $least_sum){
		$least_sum = $sum;
	}
}
# my $sum = traverse_to(2);
# print Dumper $sum;
print Dumper $least_sum;




sub how_far_from_i 
{
	my $i = shift;
	my $end_num = shift;
	return 1 if ($i == $end_num);
	
	if ($i > $end_num)
	{
		return $i - $end_num + 1;
	}
	else
	{
		return $end_num - $i + 1;
	}

};

sub get_how_far_from_index
{
	my ($crab, $index) = @_;
	if ($crab > $index){
		my $s = 1;
		my $a = 0;
		while($index < $crab){
			$a += $s;
			$s += 1;
			$crab--;
		}
		return $a;
	}elsif($index > $crab){
		my $s = 1;
		my $a = 0;
		while($index > $crab){
			$a += $s;
			$s += 1;
			$crab++;
		}
		return $a;
	}elsif ($crab == $index){
		# crab position is same as desired horizontal position
		return 0;
	}
	return 0;
}

sub traverse_to
{
	my $index = shift;

	my $sum = 0;

	# print Dumper "first iteration";
	for (my $i = 0; $i < $index; $i++){
		# print $i . "\n";
		my $current_crab_position = $items[$i];
		my $current_crab_position_from_index = get_how_far_from_index($current_crab_position, $index);
		# print qq^$current_crab_position TO $index == $current_crab_position_from_index\n^;
		$sum += $current_crab_position_from_index;
		# print Dumper qq^$current_crab_position - $current_crab_position_from_index^;
	}

	# print Dumper "second iteration";
	for (my $i = scalar @items - 1; $i >= $index; $i--){
		# print $i . "\n";
		my $current_crab_position = $items[$i];
		my $current_crab_position_from_index = get_how_far_from_index($current_crab_position, $index);
		$sum += $current_crab_position_from_index;
		# print qq^$current_crab_position TO $index == $current_crab_position_from_index\n^;
		# print Dumper qq^$current_crab_position - $current_crab_position_from_index^;
	}

	# print Dumper $index, $start;

	return $sum;
}
sub traverse_to_
{
	my $i = shift;

	my $a = 0;
	my $start_num = $items[$i];
	# print qq^start_num: $start_num\n^;
	my $how_far_from_i_ = sub {
		my $f1 = shift;
		my $f2 = shift;
		if ($f1 == $f2){return 1;}
		print qq^-- $f1 - $f2 --\n^;
		my $step_cost = 0;
		for my $index ($f1..$f2){
			$step_cost += 1;
		}
		return $step_cost;
		# return $f1 . $f2;
	};
	for my $end_num (0..$len - 1){
		my $step_cost = how_far_from_i($i, $end_num);
		if ($end_num == $i){
			$a += $step_cost;
			next;
		}

		my $b = $items[$end_num];


		my $sum = $start_num > $b ? $start_num - $b : $b - $start_num;
		print qq^$b\t$step_cost\n^;
		$a += $sum * $step_cost;
	}
	return $a;
}


# 90040997 == Correct answer!



1;